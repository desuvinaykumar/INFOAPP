package com.info.util;


public class TestEmail {

	public static void main(String[] args) {
		
		String smtp = "smtp.gmail.com";
		
		String port = "587";
		
		try {
			EmailUtility.sendEmail(smtp, port, "desuvinaykumar", "zaq1xsw2cde3*", "desuvinaykumar@gmail.com", "Test email utility", "test");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
}
