package com.info;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
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
	List<Info> fetch(@RequestBody Info info) {

		String sql = "select ta_info_title title, ta_info_category category, ta_info_info information, DATE_FORMAT(ta_info_date,'%Y%m%d%H%i%s') datetime from ta_info ";
		sql += " where 1 = 1 ";
		if(info.getCategory()!=null  && !info.getCategory().equals("")){
			sql += " and upper(ta_info_category) = upper('"+info.getCategory()+"') ";
		}
		if(info.getDatetime()!=null && !info.getDatetime().equals("")){
			sql += " and DATE_FORMAT(ta_info_date,'%Y%m%d%H%i%s') < convert('"+info.getDatetime()+"', unsigned integer)";
		}
			sql += " order by datetime desc limit 5";
		
		return jdbcTemplate.query(sql, new RowMapper<Info>(){
			@Override  
			public Info mapRow(ResultSet rs, int rownumber) throws SQLException {  
				Info e=new Info();  
				e.setTitle(rs.getString(1));
				e.setCategory(rs.getString(2));
				e.setInformation(rs.getString(3));
				e.setDatetime(rs.getString(4));
				return e;  
			}  
		});
		
	}
	
	@RequestMapping(value = "count", method = RequestMethod.POST)
	public @ResponseBody
	CountInfo count(@RequestBody Info info) {

		String sql = "select Count(*) datetime from ta_info ";
		sql += " where 1 = 1 ";
		if(info.getCategory()!=null  && !info.getCategory().equals("")){
			sql += " and upper(ta_info_category) = upper('"+info.getCategory()+"') ";
		}
		if(info.getDatetime()!=null && !info.getDatetime().equals("")){
			sql += " and DATE_FORMAT(ta_info_date,'%Y%m%d%H%i%s') < convert('"+info.getDatetime()+"', unsigned integer)";
		}
		
		return jdbcTemplate.queryForObject(sql, new RowMapper<CountInfo>(){
			@Override  
			public CountInfo mapRow(ResultSet rs, int rownumber) throws SQLException {  
				CountInfo e=new CountInfo();  
				e.setNo(rs.getInt(1));
				return e;  
			}  
		});
		
	}
	
}

class CountInfo{
	
	private int no;

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}
	
}
