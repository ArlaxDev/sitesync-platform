
# +---------+
# | Imports |
# +---------+
import numpy as np
import matplotlib.pyplot as plt
from Kalman_Filter import KalmanFilter

# +---------+
plt.ion()
plt.figure()

kalman_filer = KalmanFilter(initial_x = 0.0, initial_v = 1.0, accel_variance= 0.1)

DT = 0.1            # units: seconds
NUM_STEPS = 1000
                    # Math Symbol
                    # ------------
means = []          # mu
covariances = []    # Sigma

for time_step in range(NUM_STEPS):
    means.append(kalman_filer.mean_state_variable)
    covariances.append(kalman_filer.covariance_matrix)

    kalman_filer.predict(dt = DT)
    #print(f"Time Step: {0} | position: {1} | cov: {2}".format(time_step, kalman_filer.mean_state_variable[0], kalman_filer.mean_state_variable[1]))

plt.subplot(2, 1, 1)
plt.title('Position')
plt.plot([means[0] for mean_state in means], 'b')


plt.subplot(2, 1, 2)
plt.title('Velocity')
plt.plot([means[1] for mean_state in means], 'g')


plt.show()
plt.ginput(1)

