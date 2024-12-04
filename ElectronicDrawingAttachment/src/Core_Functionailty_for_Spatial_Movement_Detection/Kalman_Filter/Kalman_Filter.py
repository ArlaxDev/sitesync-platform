import numpy as np


class KalmanFilter:
    def __init__(self, initial_x: float,
                 initial_v: float,
                 accel_variance: float) -> None:
        """
        Arguemnts:
            @param initial_x initial position
            @param initial_v inital speed

        """
        # mean of state variable (Gaussian Random Variable)
        self._x = np.array([initial_x, initial_v])  # 2D array
        self._accel_variance = accel_variance  # Acceleration Variance

        # covariance of state GRV (Gaussian Random Variable)
        self._P = np.eye(2)
        # not ideal in practice , since we can provide inital position and inital speed (x, v) respectively

    # Time evolution of the Prediction step
    def predict(self, dt: float) -> None:
        # t ~ signifies Matrix Transpose
        # x = F x
        # P = F P Ft + G Gt a

        # F = [ 1 dt
        #       0 1 ]
        F = np.array([[1, dt], [0, 1]])
        print(F)
        new_x = F.dot(self._x)
        #print("dt: " + str(dt))
        #print(f"F : {0}, {1}, {2}, {3}".format(F[0][0], F[0][1], F[1][0], F[1][1]))

        # G = [ 0.5 * dt^2
        #           dt      ]
        G = np.array([0.5 * pow(dt,2), dt]).reshape((2,1))

        new_P = F.dot(self._P).dot(F.T) + G.dot(G.T) * self._accel_variance

        # Updae the state variable and covariance matricies
        self._x = new_x
        self._P = new_P
        print(self._x)


    @property
    def position(self) -> float:
        return self._x[0]

    @property
    def velocity(self) -> float:
        return self._x[1]

    @property
    def mean_state_variable(self) -> np.array:
        return self._x

    @property
    def covariance_matrix(self) -> np.array:
        return self._P
