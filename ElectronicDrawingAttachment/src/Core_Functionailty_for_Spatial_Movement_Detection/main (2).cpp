/*
 * mbed Application program for the mbed Nucleo series
 *  BNO055 Intelligent 9-axis absolute orientation sensor
 *  by Bosch Sensortec
 *
 * Copyright (c) 2015,'17,'20 Kenji Arai / JH1PJL
 *  http://www7b.biglobe.ne.jp/~kenjia/
 *  https://os.mbed.com/users/kenjiArai/
 *      Created: March     30th, 2015
 *      Revised: August     5th, 2020
 */

//  Include --------------------------------------------------------------------
#include    "mbed.h"
#include    "BNO055.h"
#include    "PinDetect.h"
#include    "rtos.h"
//#include    "TextLCD.h"

//  Definition -----------------------------------------------------------------
#define NUM_LOOP    100

//  Object ---------------------------------------------------------------------
static BufferedSerial pc(USBTX, USBRX, 115200);
#if defined(TARGET_LPC1114)
DigitalOut pwr_onoff(dp17);
I2C    i2c(dp5, dp27);   // SDA, SCL
// Reset =D7, addr = BNO055_G_CHIP_ADDR, mode = MODE_NDOF <- as default
BNO055 imu(i2c, dp18);
#elif defined(TARGET_LPC1768)
DigitalOut pwr_onoff(p30);
I2C    i2c(p9, p10); // SDA, SCL
// Reset =D7, addr = BNO055_G_CHIP_ADDR, mode = MODE_NDOF <- as default
BNO055 imu(i2c, p29);
#elif defined(TARGET_NUCLEO_L152RE)\
    || defined(TARGET_NUCLEO_F401RE)\
    || defined(TARGET_NUCLEO_F411RE)\
    || defined(TARGET_NUCLEO_F446RE)
#if 0
DigitalOut pwr_onoff(PB_10);
#else
DigitalOut pwr_onoff(PA_9);
#endif
I2C    i2c(PB_9, PB_8); // SDA, SCL
#if 0
// Reset = ??, addr = BNO055_G_CHIP_ADDR, mode = MODE_NDOF <- as default
BNO055 imu(i2c, PA_8);
#else
BNO055 imu(PB_9, PB_8, PA_8);
#endif
TextLCD_I2C_N lcd(&i2c, 0x7c, TextLCD::LCD8x2);  // LCD(Akizuki AQM0802A)
#elif defined(TARGET_RZ_A1H)
DigitalOut pwr_onoff(P8_11);
I2C    i2c(P1_3, P1_2); // SDA, SCL
// Reset =D7, addr = BNO055_G_CHIP_ADDR, mode = MODE_NDOF <- as default
BNO055 imu(i2c, P8_13);
#else
#error "Not cheched yet"
#endif
Timer t;

//  RAM ------------------------------------------------------------------------
BNO055_ID_INF_TypeDef       bno055_id_inf;
BNO055_EULER_TypeDef        euler_angles;
BNO055_QUATERNION_TypeDef   quaternion;
BNO055_LIN_ACC_TypeDef      linear_acc;
BNO055_GRAVITY_TypeDef      gravity;
BNO055_TEMPERATURE_TypeDef  chip_temp;

//  ROM / Constant data --------------------------------------------------------

//  Function prototypes --------------------------------------------------------
// 2 Pushbuttons, 2 onBoard LEDs, 1 Haptic Brushed DC motor,  1 potentiometer

PinDetect pb1(p19);
PinDetect pb2(p20);

DigitalOut led1(LED1);
DigitalOut led2(LED2);

PwmOut motor(p25);

PwmOut red(p21);//"R" pin
PwmOut blue(p22);//"G" pin
PwmOut green(p23);//"B" pin

AnalogIn potentiometer(p15);

volatile bool read_data = false;
volatile bool set_mode = false;
volatile bool send_quaternion_data = true;
volatile bool isCalibrated = false;
volatile float pot_value = 0.0;

//Thread t1;


//PwmOut motor(p21); //setup PWM output
//------------------------------------------------------------------------------
//  Control Program
//------------------------------------------------------------------------------
// Calibration
//  Please refer
//      BNO055 Data sheet 3.10 Calibration & 3.6.4 Sensor calibration data
void bno055_calbration(void)
{
    uint8_t d;

    printf("------ Enter BNO055 Manual Calibration Mode ------\r\n");
    //---------- Gyroscope Caliblation -----------------------------------------
    // (a) Place the device in a single stable position for a period of
    //     few seconds to allow the gyroscope to calibrate
    printf("Step1) Please wait few seconds\r\n");
    t.start();
    while (t.elapsed_time().count() < 10) {
        d = imu.read_calib_status();
        printf("Calb dat = 0x%x target  = 0x30(at least)\r\n", d);
        if ((d & 0x30) == 0x30) {
            break;
        }
        ThisThread::sleep_for(1s);
    }
    printf("-> Step1) is done\r\n\r\n");
    //---------- Magnetometer Caliblation --------------------------------------
    // (a) Make some random movements (for example: writing the number ‘8’
    //     on air) until the CALIB_STAT register indicates fully calibrated.
    // (b) It takes more calibration movements to get the magnetometer
    //     calibrated than in the NDOF mode.
    printf("Step2) random moving (try to change the BNO055 axis)\r\n");
    t.start();
    while (t.elapsed_time().count() < 30) {
        d = imu.read_calib_status();
        printf("Calb dat = 0x%x target  = 0x33(at least)\r\n", d);
        if ((d & 0x03) == 0x03) {
            break;
        }
        ThisThread::sleep_for(1s);
    }
    printf("-> Step2) is done\r\n\r\n");
    //---------- Magnetometer Caliblation --------------------------------------
    // a) Place the device in 6 different stable positions for a period of
    //    few seconds to allow the accelerometer to calibrate.
    // b) Make sure that there is slow movement between 2 stable positions
    //    The 6 stable positions could be in any direction, but make sure that
    //    the device is lying at least once perpendicular to the x, y and z axis
    printf("Step3) Change rotation each X,Y,Z axis KEEP SLOWLY!!");
    printf(" Each 90deg stay a 5 sec and set at least 6 position.\r\n");
    printf(" e.g. (1)ACC:X0,Y0,Z-9,(2)ACC:X9,Y0,Z0,(3)ACC:X0,Y0,Z9,");
    printf("(4)ACC:X-9,Y0,Z0,(5)ACC:X0,Y-9,Z0,(6)ACC:X0,Y9,Z0,\r\n");
    printf(" If you will give up, hit any key.\r\n");
    t.stop();

    // lcd
    // lcd.locate(0, 0);    // 1st line top
    //          12345678
    // lcd.printf(" BNO055 ");
    // lcd.locate(0, 1);    // 2nd line top
    //        12345678
    // lcd.puts(" JH1PJL ");
    // lcd.setContrast(0x14);
    
    while (true) {
        d = imu.read_calib_status();
        imu.get_gravity(&gravity);
        printf(
            "Calb dat = 0x%x target  = 0xff ACC:X %4.1f, Y %4.1f, Z %4.1f\r\n",
            d, gravity.x, gravity.y, gravity.z
        );
        if (d == 0xff) {
            break;
        }
        if (pc.readable()) {
            break;
        }
        // ThisThread::sleep_for(1s);
    }
    if (imu.read_calib_status() == 0xff) {
        printf("-> All of Calibration steps are done successfully!\r\n\r\n");
    } else {
        printf("-> Calibration steps are suspended!\r\n\r\n");
    }
    
    t.stop();
}
// -------------------------------------------------------------------------------------------
//void motor_thread(void const *args) {
void motor_thread() {
    // for(float p = 0.0f; p < 1.0f; p += 0.1f) {
    //     motor = p; //dim led using PWM
    //     //wait(0.1); //0.1 second time delay-so a human can see it
    // }
    //Thread::wait(1000);
}
void set_RGB_LED(float red_value, float green_value, float blue_value) {
    red = red_value;
    green = green_value;
    blue = blue_value;
}
void pb_hit_callback1 (void) {
    led1 = !led1;
    send_quaternion_data = !send_quaternion_data;
    if (!isCalibrated) {
        set_RGB_LED(1,0,0);             // set color to red
    } else if(send_quaternion_data) {
        set_RGB_LED(0,1,0);             // set color to green
    } else {
        set_RGB_LED(0,0,1);             // set color to blue
    }
}
void pb_hit_callback2 (void) {
    led2 = !led2;
    set_mode = !set_mode;
    if (set_mode) {
        motor.write(0.5f); 
        // Set RGB LED to purple with an adjustable brightness value
        set_RGB_LED(pot_value,0,pot_value);
    } else {
        motor.write(0.0f);
        for (int i = 0; i < 3; i++) {
            set_RGB_LED(147/255.0,0,219/255.0);  // Flash(ON/OFF) RGB LED with purple
            wait_us(500000);
            set_RGB_LED(0,0,0); 
            wait_us(500000);
        }
        if (!isCalibrated) {
            set_RGB_LED(1,0,0);             // set color to red
        } else if(send_quaternion_data) {
            set_RGB_LED(0,1,0);             // set color to green
        } else {
            set_RGB_LED(0,0,1);             // set color to blue
        }
    }
}

// -------------------------------------------------------------------------------------------
int main()
{
    // Pushbutton setup
    pb1.mode(PullDown);
    pb2.mode(PullDown);

    pb1.attach_deasserted(&pb_hit_callback1);
    pb2.attach_deasserted(&pb_hit_callback2);

    pb1.setSampleFrequency();
    pb2.setSampleFrequency();

    // Setting up motor
    motor.period(0.1);

    //Turn on RGB LED
    red.period(0.001);
    green.period(0.001);
    blue.period(0.001);
    
    red = 0;
    green = 0;
    blue = 0;
    /*
    for (int i = 0; i < 255; i++) {
        red.write(i/255.0);
        //ThisThread::sleep_for(100ms);
        //ThisThread::wait(0.1);
    }
    red = 0;
    for (int i = 0; i < 255; i++) {
        green.write(i/255.0);
        //ThisThread::sleep_for(100ms);
        //ThisThread::wait(0.1);
    }
    green = 0;
    for (int i = 0; i < 255; i++) {
        blue.write(i/255.0);
        //ThisThread::sleep_for(100ms);
        //ThisThread::wait(0.1);
    }*/

    //t1.start(callback(motor_thread, (void *) "Th2"));
    //t1.start(motor_thread);
    // -------------------------------------------------------------
    uint8_t ser_buf[4];

    imu.set_mounting_position(MT_P6);
    // pwr_onoff = 1;
    // printf("\r\n\r\nIf pc terminal soft is ready, please hit any key!\r\n");
    // while (pc.readable() == 0) {;}
    // printf(
    //     "Bosch Sensortec BNO055 test program on " __DATE__ "/" __TIME__ "\r\n"
    // );
    // Is BNO055 avairable?
    // if (imu.chip_ready() == 0) {
    //     do {
    //         printf("Bosch BNO055 is NOT avirable!!\r\n Reset\r\n");
    //         pwr_onoff = 0;  // Power off
    //         ThisThread::sleep_for(100ms);
    //         pwr_onoff = 1;  // Power on
    //         ThisThread::sleep_for(20ms);
    //     } while(imu.reset());
    // }
    // printf("Bosch BNO055 is available now!!\r\n");
    // printf("AXIS_REMAP_CONFIG:0x%02x, AXIS_REMAP_SIGN:0x%02x\r\n",
    //        imu.read_reg0(BNO055_AXIS_MAP_CONFIG),
    //        imu.read_reg0(BNO055_AXIS_MAP_SIGN)
    //       );
    // imu.read_id_inf(&bno055_id_inf);
    // printf("CHIP ID:0x%02x, ACC ID:0x%02x, MAG ID:0x%02x, GYR ID:0x%02x, ",
    //        bno055_id_inf.chip_id, bno055_id_inf.acc_id,
    //        bno055_id_inf.mag_id, bno055_id_inf.gyr_id
    //       );
    // printf("SW REV:0x%04x, BL REV:0x%02x\r\n",
    //        bno055_id_inf.sw_rev_id, bno055_id_inf.bootldr_rev_id);
    // while (pc.readable() == 1) {
    //     pc.read(ser_buf, 1);
    // }
    // printf("If you would like to calibrate the BNO055,");
    // printf(" please hit 'y' (No: any other key)\r\n");
    // while (pc.readable() == 0) {;}
    // pc.read(ser_buf, 1);
    // uint8_t c = ser_buf[0];
    // if (c == 'y') {
    set_RGB_LED(1,0,0);
    bno055_calbration();

    isCalibrated = true;
    // }
    // printf("[E]:Euler Angles[deg],[Q]:Quaternion[],[L]:Linear accel[m/s*s],");
    // printf("[G]:Gravity vector[m/s*s],[T]:Chip temperature,Acc,Gyr[degC]");
    // printf(",[S]:Status,[M]:time[mS]\r\n");
    t.start();
    while(true) {
        // imu.get_Euler_Angles(&euler_angles);
        // printf("Y,%+6.1f,R,%+6.1f,P,%+6.1f\n",
        //        euler_angles.h, euler_angles.r, euler_angles.p);
        // imu.get_quaternion(&quaternion);
        // printf("%d,%d,%d,%d\n",
        //        quaternion.x, quaternion.y, quaternion.z, quaternion.w);
        // imu.get_linear_accel(&linear_acc);
        // printf("%+6.1f,%+6.1f\n",
        //        linear_acc.x, linear_acc.y);
        // imu.get_gravity(&gravity);
        pot_value = potentiometer.read();
        if (pot_value < 0.2) {
            pot_value = 0.2f;
        } else if ((pot_value >= 0.2) && (pot_value < 0.4)) {
            pot_value = 0.4f;
        } else if ((pot_value >= 0.4) && (pot_value < 0.6)) {
            pot_value = 0.6f;
        } else if ((pot_value >= 0.6) && (pot_value < 0.8)) {
            pot_value = 0.8f;
        } else {
            pot_value = 1.0f;
        }
        // ---------------------------------------------------------
        if (send_quaternion_data) {
            imu.get_quaternion(&quaternion);
            set_RGB_LED(0,1,0);             // set color to green
            printf("%d,%d,%d,%d\n",
                quaternion.x, quaternion.y, quaternion.z, quaternion.w);
        } else {
            imu.get_gravity(&gravity);
            set_RGB_LED(0,0,pot_value);             // set color to blue
            printf("%+6.1f,%+6.1f,%5.2f\n",
               gravity.x, gravity.y, pot_value);
        }
        
        
        // printf("%+6.1f,%+6.1f\n",
        //        gravity.x, gravity.y);
        // imu.get_chip_temperature(&chip_temp);
        // printf("[T],%+d,%+d,",
        //        chip_temp.acc_chip, chip_temp.gyr_chip);
        // printf("[S],0x%x,[M],%d\r\n",
        //        imu.read_calib_status(), (uint32_t)t.elapsed_time().count());
    }
}


// Diffrent output format as for your reference
#if 0
int main()
{
    uint8_t i;

    pwr_onoff = 1;
    printf(
        "Bosch Sensortec BNO055 test program on " __DATE__ "/" __TIME__ "\r\n"
    );
    // Is BNO055 avairable?
    if (imu.chip_ready() == 0) {
        do {
            printf("Bosch BNO055 is NOT avirable!!\r\n");
            pwr_onoff = 0;  // Power off
            ThisThread::sleep_for(100ms);
            pwr_onoff = 1;  // Power on
            ThisThread::sleep_for(20ms);
        } while(imu.reset());
    }
    imu.set_mounting_position(MT_P6);
    printf("AXIS_REMAP_CONFIG:0x%02x, AXIS_REMAP_SIGN:0x%02x\r\n",
           imu.read_reg0(BNO055_AXIS_MAP_CONFIG),
           imu.read_reg0(BNO055_AXIS_MAP_SIGN)
          );
    imu.read_id_inf(&bno055_id_inf);
    printf("CHIP:0x%02x, ACC:0x%02x, MAG:0x%02x,",
           bno055_id_inf.chip_id, bno055_id_inf.acc_id, bno055_id_inf.mag_id
          );
    printf("GYR:0x%02x, , SW:0x%04x, , BL:0x%02x\r\n",
           bno055_id_inf.gyr_id, bno055_id_inf.sw_rev_id,
           bno055_id_inf.bootldr_rev_id
          );
    while(true) {
        printf("Euler Angles data\r\n");
        for (i = 0; i < NUM_LOOP; i++) {
            imu.get_Euler_Angles(&euler_angles);
            printf("Heading:%+6.1f [deg], Roll:%+6.1f [deg],",
                   euler_angles.h, euler_angles.r,);
            printf(" Pich:%+6.1f [deg], #%02d\r\n",
                   euler_angles.p, i);
            ThisThread::sleep_for(500ms);
        }
        printf("Quaternion data\r\n");
        for (i = 0; i < NUM_LOOP; i++) {
            imu.get_quaternion(&quaternion);
            printf("W:%d, X:%d, Y:%d, Z:%d, #%02d\r\n",
                   quaternion.w, quaternion.x, quaternion.y, quaternion.z, i);
            ThisThread::sleep_for(500ms);
        }
        printf("Linear accel data\r\n");
        for (i = 0; i < NUM_LOOP; i++) {
            imu.get_linear_accel(&linear_acc);
            printf(
                "X:%+6.1f[m/s*s], Y:%+6.1f[m/s*s], Z:%+6.1f[m/s*s], #%02d\r\n",
                linear_acc.x, linear_acc.y, linear_acc.z, i
            );
            ThisThread::sleep_for(500ms);
        }
        printf("Gravity vector data\r\n");
        for (i = 0; i < NUM_LOOP; i++) {
            imu.get_gravity(&gravity);
            printf(
                "X:%+6.1f[m/s*s], Y:%+6.1f[m/s*s], Z:%+6.1f[m/s*s], #%02d\r\n",
                gravity.x, gravity.y, gravity.z, i
            );
            ThisThread::sleep_for(500ms);
        }
        printf("Chip temperature data\r\n");
        for (i = 0; i < (NUM_LOOP / 4); i++) {
            imu.get_chip_temperature(&chip_temp);
            printf("Acc chip:%+d [degC], Gyr chip:%+d [degC], #%02d\r\n",
                   chip_temp.acc_chip, chip_temp.gyr_chip, i);
            ThisThread::sleep_for(500ms);
        }
    }
}
#endif
