from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from datetime import datetime
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import statsmodels.api as sm

app = Flask(__name__)

# Helper function to convert dates to ordinal values
def date_to_ordinal(dates):
    return [datetime.strptime(date, "%Y-%m-%d").toordinal() for date in dates]

# LSTM Model
def train_lstm_model(dates):
    dates_ord = np.array(date_to_ordinal(dates)).reshape(-1, 1)
    model = Sequential([
        LSTM(50, activation='relu', input_shape=(1, 1)),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mse')
    model.fit(dates_ord[:-1], dates_ord[1:], epochs=200, verbose=0)

    predictions = []
    last_date = dates_ord[-1]
    for _ in range(3):
        next_date = model.predict(np.array([[last_date]]))
        last_date = next_date
        predictions.append(datetime.fromordinal(int(next_date[0][0])).strftime("%Y-%m-%d"))
    return predictions

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    dates = data.get("dates")

    if not dates or len(dates) < 2:
        return jsonify({"error": "Not enough data"}), 400

    predictions = train_lstm_model(dates)
    return jsonify({"predictions": predictions})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
