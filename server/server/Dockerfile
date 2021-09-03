FROM python:3.8.2-alpine

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

RUN pip install flask-mongoengine

COPY . /app

ENTRYPOINT [ "python" ]

CMD [ "app.py" ]
