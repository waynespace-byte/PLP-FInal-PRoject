import tensorflow as tf
from tensorflow.keras import layers
import numpy as np

# Placeholder dataset (replace with real data)
x_train = np.random.rand(100, 224, 224, 3)
y_train = np.random.randint(0, 2, 100)

model = tf.keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(2, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(x_train, y_train, epochs=5)
model.save('sample_weights.h5')