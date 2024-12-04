import unittest
#https://docs.python.org/3/library/unittest.html
import pytest
import ipytest
from Kalman_Filter import KalmanFilter

#kf = KalmanFilter(initial_x=0.4, initial_v=0.7)
#print(kf.x)

class TestStringKalmanFilter(unittest.TestCase):

    def test_contructor_with_x_and_v(self):
        x = 0.4
        v = 0.7
        kf = KalmanFilter(initial_x=x, initial_v=v, accel_variance=1.1)
        self.assertAlmostEqual(kf.x[0], x)
        self.assertAlmostEqual(kf.v[0], v)
        print("Passed")