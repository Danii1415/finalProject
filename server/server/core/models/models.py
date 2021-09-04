from core.db.database import DB


class Quote(object):
	
	def __init__(self, id, quote):
		self.id = id
		self.quote = quote

	def insert(self):
		if not DB.find_one("quotes", {"id": self.id}):
			DB.insert(collection='quotes', data=self.json())
		
	def json(self):
		return {
			'id': self.id,
			'quote': self.quote
			}

	@staticmethod
	def find(id):
		data = DB.find_one("quotes", {"id": id})
		return Quote(int(data['id']), data['quote'])