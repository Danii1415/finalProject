from core.validator import Validator
from core.db.database import DB


class Teacher(object):
	def __init__(self, database):
		self.validator = Validator()
		self.db = database

		self.collection_name = 'teachers'  # collection name

		self.fields = {
			"name": "string",
			"mail": "string",
			"workshops": "list",
			"created": "datetime",
			"updated": "datetime"
		}

		self.create_required_fields = ["name", "mail", "workshops"]

		# Fields optional for CREATE
		self.create_optional_fields = []

		# Fields required for UPDATE
		self.update_required_fields = ["name", "mail", "workshops"]

		# Fields optional for UPDATE
		self.update_optional_fields = []

	def create(self, teacher):
		# Validator will throw error if invalid
		self.validator.validate(teacher, self.fields, self.create_required_fields, self.create_optional_fields)
		res = self.db.insert(teacher, self.collection_name)
		return res

	def find(self, teacher):  # find all
		return self.db.find(teacher, self.collection_name)

	def find_by_id(self, id):
		return self.db.find_by_id(id, self.collection_name)

	def find_by_name(self, name):
		found = self.find({"name": name})
		if found is None:
			return "not found"
		if len(found)>0:
			found = found[0]
		if "name" in found:
			found["_id"] = str(found["_id"])
		return found

	def update(self, id, teacher):
		self.validator.validate(teacher, self.fields, self.update_required_fields, self.update_optional_fields)
		return self.db.update(id, teacher,self.collection_name)

	def delete(self, id):
		return self.db.delete(id, self.collection_name)