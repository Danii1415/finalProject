import random
from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from core import app

from .db.database import DB
from .models.models import Quote
from .models.student import Student 
from .models.project import Project
from .models.teacher import Teacher



from .db.db_manager import DBManager

db_manager=DBManager()
db = DB()
student = Student(db)
project = Project(db)
teacher = Teacher(db)



@app.route('/')
def index():
	return db_manager.index()

@app.route('/init_db')
def init_for_testing_db():
	db.client.drop_database('finalProjectsDB')
	db.db= db.client.finalProjectsDB
	
	name = "Yossi"
	ID = "203516794"
	mail = "yossi@mta.ac.il"
	workshops= "sdaSD"
	teacherId = teacher.create({'name': name, 'mail': mail, 'workshops': workshops})

	workshopId=db_manager.insert_workshop_and_append_it_to_teacher("sadna2", "Yossi")

	title = "project100"
	#teacherId = "610802d00b576fc654a9138a"
	#workshopId = "610802dc0b576fc654a9138b"
	studentList =[{'firstName': "sagiv", 'lastName': "levy", 'id': "203516794", 'mail': "sagivle@mta.ac.il"},
					{'firstName': "daniel", 'lastName': "daniel", 'id': "123456789", 'mail': "levsagiv@gmail.com"}]
	imgLink = ""
	preview = ""
	db_manager.insert_project(title, teacherId, workshopId, studentList, imgLink, preview)

	return "success to init DB for testing"

@app.route('/quote')
def quote():
	app.logger.info(f"ENTERING: {request.path}")
	#client = MongoClient('db')
	#db = client.quotesdb
	#data = list(db.quotes.find())
	#DB.find_one
	data = Quote.find(1)
	return data.json()
	if len(data) < 1:
		return {
				"id": 0,
				"quote": "Remember to init the db with InitDB.js"
		}

	row = random.choice(data)
	return {
		"id": int(row['id']),
		"quote": row['quote']
	}




@app.route('/teachers/', methods=['GET'])
def get_teachers():
	name = "Yossi"
	ID = "203516794"
	mail = "yossi@mta.ac.il"
	workshops= "sdaSD"
	#response = teacher.create({'name': name, 'mail': mail, 'workshops': workshops})
	#db_manager.insert_teacher(name, mail)
	return db_manager.get_all_teachers(), 200


@app.route('/insert_workshop/', methods=['GET'])
def insert_workshop():
	ans = ""#db_manager.insert_workshop_and_append_it_to_teacher("sadna2", "Yossi")
	return ans


@app.route('/students/', methods=['GET'])
def get_students():
	first_name = "Sagiv"
	last_name = "Levy"
	ID = "203516794"
	mail = "sagivle@mta.ac.il"
	#response = student.create({'firstName': first_name, 'lastName': last_name, 'id': ID, 'mail': mail})
	return db_manager.get_all_students(), 200


@app.route('/students/<string:student_id>/', methods=['GET'])
def get_task(student_id):
	return student.find_by_id(student_id), 200


@app.route('/students/', methods=['POST'])
def add_student():
	if request.method == "POST":
		first_name = request.form['firstName']
		last_name = request.form['lastName']
		ID = request.form['id']
		mail = request.form['mail']
		response = student.create({'firstName': first_name, 'lastName': last_name, 'id': ID, 'mail': mail})
		return response, 201


@app.route('/students/<string:student_id>/', methods=['PUT'])
def update_tasks(student_id):
	if request.method == "PUT":
		title = request.form['title']
		body = request.form['body']
		response = student.update(student_id, {'title': title, 'body': body})
		return response, 201


@app.route('/students/<string:student_id>/', methods=['DELETE'])
def delete_tasks(student_id):
	if request.method == "DELETE":
		student.delete(student_id)
		return "Record Deleted"


@app.route('/projects/', methods=['GET'])
def get_projects():
	if request.method == "GET":
		title = "project100"
		teacherId = "610802d00b576fc654a9138a"
		workshopId = "610802dc0b576fc654a9138b"
		studentList =[{'firstName': "sagiv", 'lastName': "levy", 'id': "203516794", 'mail': "sagivle@mta.ac.il"},
						{'firstName': "daniel", 'lastName': "daniel", 'id': "123456789", 'mail': "levsagiv@gmail.com"}]
		imgLink = ""
		preview = ""
		#db_manager.insert_project(title, teacherId, workshopId, studentList, imgLink, preview)
		response = db_manager.get_all_projects()
		return response, 200

@app.route('/projects/', methods=['POST'])
def add_project():
	if request.method == "POST":
		title = request.form['title']
		teacherId = request.form['teacherId']
		workshopId = request.form['workshopId']
		studentList = request.form['studentList']
		imgLink = request.form['imgLink']
		preview = request.form['preview']
		response = db_manager.insert_project(title, teacherId, workshopId, studentList, imgLink, preview)
		return response, 201