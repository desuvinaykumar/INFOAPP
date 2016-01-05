package com.info.contactus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.info.AppStatus;
import com.info.util.EmailUtility;

@Controller
@RequestMapping("/contactus")
public class ContactUsController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@RequestMapping(value = "submit", method = RequestMethod.POST)
	public @ResponseBody
	AppStatus create(@RequestBody ContactUs contact) {

		AppStatus status = new AppStatus();
		status.setSuccessMsg("Thank you for your valuable suggestion.");
		
		try {
			EmailUtility.sendContactMail("Janta Khabar Suggestion : "+contact.getEmail(), contact.getSuggestion());;
		} catch (Exception e) {
			e.printStackTrace();
			status.setErrorMsg("Not able to submit suggestion due to some technical problems");
		}
		
		return status;

	}
	
}
