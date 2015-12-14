package com.info;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Utilities {

	public static String elapsedTime(String dateStart, String dateStop){
		
		//String dateStart = "01/14/2012 09:29:58";
		//String dateStop = "01/15/2012 10:31:48";

		//HH converts hour in 24 hours format (0-23), day calculation
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");

		Date d1 = null;
		Date d2 = null;
		StringBuffer sb = new StringBuffer("");
		
		try {
			d1 = format.parse(dateStart);
			d2 = format.parse(dateStop);

			//in milliseconds
			long diff = d2.getTime() - d1.getTime();

			long diffSeconds = diff / 1000 % 60;
			long diffMinutes = diff / (60 * 1000) % 60;
			long diffHours = diff / (60 * 60 * 1000) % 24;
			long diffDays = diff / (24 * 60 * 60 * 1000);
			if(diffDays > 0){
				sb.append(diffDays + " day");
				if(diffDays>1){
					sb.append("s");
				}
			}
			if(diffHours > 0 && sb.length() == 0){
				sb.append(diffHours + " hour");
				if(diffHours>1){
					sb.append("s");
				}
			}
			if(diffMinutes > 0 && sb.length() == 0){
				sb.append(diffMinutes + " minute");
				if(diffMinutes>1){
					sb.append("s");
				}
			}
			if(diffSeconds > 0 && sb.length() == 0){
				sb.append(diffSeconds + " second");
				if(diffSeconds>1){
					sb.append("s");
				}
			}
			if(sb.length() == 0){
				sb.append("Just now");
			}else{
				sb.append(" ago.");				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return sb.toString();
	}
	
}
