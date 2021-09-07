
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class Mail_Service(object):

	def send_mail(self, receiver_address, subject, content):
		html = """\
				<html>
					<head></head>
					<body>
					<p>You got a new msg!!<br><br>
					""" + content + """\
					<br><br>
						<a href="https://127.0.0.1:3000/">See Msg</a>
					</p>
					</body>
				</html>
				"""

		sender_address = 'uero2021.bet.with.your.friends@gmail.com'
		sender_pass = 'bwyf2021'
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
