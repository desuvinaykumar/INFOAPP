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

import com.info.util.Utilities;
import com.info.util.WordCensorUtility;

@Controller
@RequestMapping("/favoriteinfo")
public class FavoriteInfoController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@RequestMapping(value = "update", method = RequestMethod.POST)
	public @ResponseBody
	Info create(@RequestBody Info info) {

		String sqlSelect = "select count(*) from ta_favorites where ta_fav_info_title = ? and DATE_FORMAT(ta_fav_info_date,'%Y%m%d%H%i%s') = ? and ta_fav_user_emailid = ?";
		
		int isExists = jdbcTemplate.queryForInt(sqlSelect, new Object[]{
				info.getTitle(), 
				info.getCreatedDate(), 
				info.getEmail()
		});
		
		if(isExists == 0){
			String sqlInsert = "insert into ta_favorites (ta_fav_info_title, ta_fav_info_date, ta_fav_user_emailid) "
					+ "values (?,STR_TO_DATE(?,'%Y%m%d%H%i%s'), ?) ";
			jdbcTemplate.update(sqlInsert, new Object[]{
					info.getTitle(),
					info.getCreatedDate(),
					info.getEmail()
			});
		}else{
			String sqlDelete = "delete from ta_favorites where ta_fav_info_title = ? and DATE_FORMAT(ta_fav_info_date,'%Y%m%d%H%i%s') = ? and ta_fav_user_emailid = ?";
			jdbcTemplate.update(sqlDelete, new Object[]{
					info.getTitle(),
					info.getCreatedDate(),
					info.getEmail()
			});
		}
		
		return info;

	}
	
	@RequestMapping(value = "fetch", method = RequestMethod.POST)
	public @ResponseBody
	List<Info> getData(@RequestBody Info info) {
		
		String sql = "select ta_info_title title, ta_category_desc category, ta_info_info information, DATE_FORMAT(ta_info_date,'%Y%m%d%H%i%s') datetime, "
				+ " ta_info_likes likes, ta_info_dislikes dislikes, DATE_FORMAT(current_timestamp,'%Y%m%d%H%i%s'), DATE_FORMAT(ta_info_createddate,'%Y%m%d%H%i%s') createdDate ";
		
		if(info.getEmail()!=null  && !info.getEmail().equals("")){
			sql += ", (select count(*) from ta_favorites where ta_fav_info_title = ta_info_title and ta_fav_info_date = ta_info_createddate and ta_fav_user_emailid = '"+info.getEmail()+"') temp ";
		}else{
			sql += ", 0 temp ";
		}
		
				sql += " from ta_info, ta_category, ta_favorites ";
		sql += " where ta_category_id = ta_info_category and ta_fav_info_title = ta_info_title and ta_fav_info_date = ta_info_createddate ";
		
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
				e.setTimeElapsed(Utilities.elapsedTime(rs.getString(4), rs.getString(7)));
				e.setCreatedDate(rs.getString(8));
				e.setBookmarked(rs.getString(9));
				return e;  
			}  
		});
	}
	
	
}
