package com.info.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/userinformation")
public class UserController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@RequestMapping(value = "update", method = RequestMethod.POST)
	public @ResponseBody User create(@RequestBody User user) {

		String sql = "INSERT INTO ta_user (ta_user_emailid,ta_user_name,ta_user_picture,ta_user_gender,ta_user_lastlogin ) "
				+ "VALUES (?, ?, ?, ?, current_timestamp) "
				+ "ON DUPLICATE KEY UPDATE ta_user_lastlogin=current_timestamp, ta_user_picture=? ";
		
		jdbcTemplate.update(sql, new Object[] { 
				user.getEmail(),
				user.getName(),
				user.getPicture(),
				user.getGender(),
				user.getPicture()
			});
		return user;
	}
	
}
