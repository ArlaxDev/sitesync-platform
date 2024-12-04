using System;
using System.Collections;
using System.Collections.Generic;
using System.IO.Ports;
using Unity.Mathematics;
using UnityEngine;

public class LineGenerator : MonoBehaviour
{
    public GameObject linePrefab;

    public SerialPort _serialPort = new SerialPort("COM6", 115200);

    Line activeLine;
    private int x = 403;
    private int y = 323;
    private float accel_x;
    private float accel_y;
    private float sensitivity;
    private Vector3 imu_movement;

    private void Start()
    {
        InvokeRepeating("SerialData", 0f, 0.1f);
        _serialPort.Open();
    }

    void Update()
    {
        SerialData();
        if (Input.GetMouseButtonDown(0))
        {
            GameObject newLine = Instantiate(linePrefab);
            activeLine = newLine.GetComponent<Line>();
        }
        if (Input.GetMouseButtonUp(0))
        {
            activeLine = null;
        }
        if (activeLine != null)
        {
            //if (accel_y >= 3)
            if (accel_y >= 6*sensitivity)
            { 
                y += 1;
            }
            else if (accel_y <= -6 * sensitivity)
            { 
                y -= 1;
            }
            else if (accel_x <= -6 * sensitivity)
            { 
                x -= 1;
            }
            else if (accel_x >= 6 * sensitivity)
            { 
                x += 1;
            }
            //imu_movement
            imu_movement.Set(x, y, 0);
            //Vector2 mousePos = Camera.main.ScreenToWorldPoint(new Vector2(x, y);
            //Vector2 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            Vector2 mousePos = Camera.main.ScreenToWorldPoint(imu_movement);
            //Debug.Log(Input.mousePosition);
            activeLine.UpdateLine(mousePos);
        }
    }

    void SerialData()
    {
        try
        {
            string dataString = _serialPort.ReadLine();
            string[] dataStrings = dataString.Split(',');
            accel_x = float.Parse(dataStrings[0]);
            accel_y = float.Parse(dataStrings[1]);
            sensitivity = float.Parse(dataStrings[2]);
            Debug.Log(accel_x + " | " + accel_y + " | " + sensitivity);
        } catch (System.Exception ex)
        {
            //Debug.Log(ex.Message);
            // do nothing
        }
    }
}