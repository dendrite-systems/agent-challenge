link = "www.website.com"
email = ""



success = link + auth() + fill("email input", email) + submit() + parse_res("Form submitted", bool)

email_op = Fill("email input", email)
submit_op = Click("Submit button")
criteria = "Form submitted sucessfully"

success = auth(link) * email_op * submit_op * Validate(criteria)