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
		
		return this.fetch(info).get(0);

	}
	
	@RequestMapping(value = "fetch", method = RequestMethod.POST)
	public @ResponseBody
	List<Info> fetch(@RequestBody Info info) {

		String sql = "select ta_info_title title, ta_category_desc category, ta_info_info information, DATE_FORMAT(ta_info_date,'%Y%m%d%H%i%s') datetime, ta_info_likes likes, ta_info_dislikes dislikes from ta_info, ta_category ";
		sql += " where ta_category_id = ta_info_category ";
		if(info.getCategory()!=null  && !info.getCategory().equals("")){
			sql += " and ta_info_category = "+info.getCategory()+" ";
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
				e.setLikes(rs.getInt(5));
				e.setDislikes(rs.getInt(6));
				return e;  
			}  
		});
		
	}
	
	@RequestMapping(value = "count", method = RequestMethod.POST)
	public @ResponseBody
	CountInfo count(@RequestBody Info info) {

		String sql = "select Count(*) from ta_info, ta_category ";
		sql += " where ta_category_id = ta_info_category ";
		if(info.getCategory()!=null  && !info.getCategory().equals("")){
			sql += " and ta_info_category = "+info.getCategory()+" ";
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
	
	@RequestMapping(value = "categoryList", method = RequestMethod.POST)
	public @ResponseBody
	List<Category> categoryList() {

		String sql = "select ta_category_id, ta_category_desc from ta_category order by ta_category_id";
		
		return jdbcTemplate.query(sql, new RowMapper<Category>(){
			@Override  
			public Category mapRow(ResultSet rs, int rownumber) throws SQLException {  
				Category e=new Category();  
				e.setId(rs.getInt(1));
				e.setDesc(rs.getString(2));
				return e;  
			}  
		});
		
	}
	
	@RequestMapping(value = "updateLikes", method = RequestMethod.POST)
	public @ResponseBody
	Info updateLikes(@RequestBody Info info) {

		String sql = "update ta_info set ta_info_likes = ta_info_likes+1 "
				+ " where DATE_FORMAT(ta_info_date,'%Y%m%d%H%i%s') = ? and ta_info_title = ? ";
		
		jdbcTemplate.update(sql,new Object[] { info.getDatetime(),
				info.getTitle()
			});
		
		return info;
	}
	
	@RequestMapping(value = "updateDislikes", method = RequestMethod.POST)
	public @ResponseBody
	Info updateDislikes(@RequestBody Info info) {

		String sql = "update ta_info set ta_info_dislikes = ta_info_dislikes+1 "
				+ " where DATE_FORMAT(ta_info_date,'%Y%m%d%H%i%s') = ? and ta_info_title = ? ";
		
		jdbcTemplate.update(sql,new Object[] { info.getDatetime(),
				info.getTitle()
			});
		return info;
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
