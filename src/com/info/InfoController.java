package com.info;

import java.util.List;

import org.codehaus.jackson.map.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/info")
public class InfoController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@RequestMapping(value = "create", method = RequestMethod.POST)
	public @ResponseBody
	Info create(@RequestBody Info info) {

		String sql = "INSERT INTO ta_info " +
				"(ta_info_title, ta_info_category, ta_info_info) VALUES (?, ?, ?)";
		
		jdbcTemplate.update(sql, new Object[] { info.getTitle(),
				info.getCategory(), info.getInformation()  
			});
		
		return info;

	}
	
	@RequestMapping(value = "fetch", method = RequestMethod.POST)
	public @ResponseBody
	List<Info> fetch(@RequestBody JSONPObject info) {

		String sql = "INSERT INTO ta_info " +
				"(ta_info_title, ta_info_category, ta_info_info) VALUES (?, ?, ?)";
		
		jdbcTemplate.update(sql, new Object[] {
			});
		
		return null;

	}
	
}
