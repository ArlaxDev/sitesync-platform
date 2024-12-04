#include "mbed.h"
#include "SDFileSystem.h"

// Configure the ADC pin, SD card, and push button
AnalogIn microphone(p17);              // Microphone input on pin 17
SDFileSystem sd(p5, p6, p7, p8, "sd"); // MOSI, MISO, SCK, CS
DigitalIn button(p21, PullUp);         // Push button with internal pull-up

// WAV file parameters
const int SAMPLE_RATE = 8000;  // 8 kHz sampling rate
const int BITS_PER_SAMPLE = 16; // 16-bit samples
const int CHANNELS = 1;         // Mono
const int RECORD_DURATION = 5;  // Record duration in seconds

// Function to write the WAV header
void writeWavHeader(FILE *file, int sampleRate, int bitsPerSample, int channels, int dataSize) {
    // WAV file header
    char header[44] = {
        'R', 'I', 'F', 'F',
        0, 0, 0, 0, // File size - 8 bytes
        'W', 'A', 'V', 'E',
        'f', 'm', 't', ' ',
        16, 0, 0, 0, // Subchunk1 size (16 for PCM)
        1, 0,        // Audio format (1 for PCM)
        (char)channels, 0, // Number of channels
        (char)(sampleRate & 0xFF), (char)((sampleRate >> 8) & 0xFF), // Sample rate
        (char)((sampleRate * channels * bitsPerSample / 8) & 0xFF),
        (char)(((sampleRate * channels * bitsPerSample / 8) >> 8) & 0xFF),
        (char)(channels * bitsPerSample / 8), 0, // Block align
        (char)bitsPerSample, 0, // Bits per sample
        'd', 'a', 't', 'a',
        (char)(dataSize & 0xFF), (char)((dataSize >> 8) & 0xFF),
        (char)((dataSize >> 16) & 0xFF), (char)((dataSize >> 24) & 0xFF)
    };
    fwrite(header, sizeof(header), 1, file);
}

int main() {
    printf("Ready to record audio. Press the button to start recording.\n");

    while (true) {
        if (button == 0) { // Button pressed (active low)
            printf("Recording audio...\n");

            // Open the file for writing
            FILE *file = fopen("/sd/recording.wav", "w");
            if (!file) {
                printf("Failed to open file for writing!\n");
                continue;
            }

            // Write WAV header placeholder (will update size later)
            writeWavHeader(file, SAMPLE_RATE, BITS_PER_SAMPLE, CHANNELS, 0);

            // Capture audio data
            int totalSamples = SAMPLE_RATE * RECORD_DURATION;
            int dataSize = totalSamples * CHANNELS * (BITS_PER_SAMPLE / 8);
            for (int i = 0; i < totalSamples; i++) {
                uint16_t sample = microphone.read_u16(); // Read ADC value
                fwrite(&sample, sizeof(sample), 1, file);
                wait_us(1000000 / SAMPLE_RATE); // Wait to maintain the sampling rate
            }

            // Update the file size in the WAV header
            fseek(file, 4, SEEK_SET);
            uint32_t fileSize = 36 + dataSize;
            fwrite(&fileSize, 4, 1, file);
            fseek(file, 40, SEEK_SET);
            fwrite(&dataSize, 4, 1, file);

            fclose(file);
            printf("Audio recording completed!\n");
        }
        //wait_ms(100); // Debounce delay
    }
}
