
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class Mail_Service(object):

	def send_mail(self, receiver_address, subject, content):
		html = """\
				<html>
					<head></head>
					<body>
					<p>
					""" + content + """\
					<br><br>
						<a href="https://127.0.0.1:3000/">link to website</a>
					</p>
					</body>
				</html>
				"""

		sender_address = 'mta.final.project.system@gmail.com'
		sender_pass = 'p0o9i8u7y6t5'
		message = MIMEMultipart()
		message['From'] = sender_address
		message['To'] = receiver_address
		message['Subject'] = subject
		message.attach(MIMEText(html, 'html'))

		#Create SMTP session for sending the mail
		session = smtplib.SMTP('smtp.gmail.com', 587) #use gmail with port
		session.starttls() #enable security
		session.login(sender_address, sender_pass) #login with mail_id and password
		text = message.as_string()
		session.sendmail(sender_address, receiver_address, text)
		session.quit()


	def send_mail_to_mail_list(self, receiver_addresses_list, subject, content):
		for receiver_address in receiver_addresses_list:
			self.send_mail(receiver_address, subject, content)


	def send_msg_mail(self, receiver_addresses_list, str_html_msg_to_send):
		self.send_mail_to_mail_list(receiver_addresses_list, "Final Project - you got a new message", "Message content: <br>" + str_html_msg_to_send)


	def send_create_new_project_mail(self, receiver_addresses_list, sadna_name, project_number, project_name):
		self.send_mail_to_mail_list(receiver_addresses_list, "Final Project - New project was created",  "Course name: " + sadna_name+"<br>"+ "Project Number: "+project_number+"<br>"+"Project_name: "+ project_name)


	def send_status_was_changed_mail(self, receiver_addresses_list, new_status):
		self.send_mail_to_mail_list(receiver_addresses_list, "Final Project - status was changed", "New status: " + new_status)

	
	def send_teacher_password_mail(self, receiver_address, password):
		self.send_mail(receiver_address, "Teacher user was created succesfully", "Your new password: " + password)

