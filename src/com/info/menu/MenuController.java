package com.info.menu;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/menu")
public class MenuController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@RequestMapping(value = "get", method = RequestMethod.POST)
	public @ResponseBody
	List<Menu> fetch() {

		String sql = "select ta_menu_id, ta_menu_desc, ta_menu_seq, ta_menu_code from ta_menu order by ta_menu_seq asc";
		
		return jdbcTemplate.query(sql, new RowMapper<Menu>(){
			@Override  
			public Menu mapRow(ResultSet rs, int rownumber) throws SQLException {  
				Menu e=new Menu(); 
				e.setId(rs.getInt(1));
				e.setDesc(rs.getString(2));
				e.setCode(rs.getString(4));
				return e;  
			}  
		});
	}
	
}
