package com.info.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.BeanNameAware;

public class WordCensorUtility implements BeanNameAware {

	private static String beanName = null;
	
	private List<String> strList = new ArrayList<String>();
	
	public List<String> getStrList() {
		return strList;
	}

	public void setStrList(List<String> strList) {
		this.strList = strList;
	}

	public static String censor(String str){
		
		for(String word : getList()){
			word = word.toLowerCase();
			while(str.toLowerCase().indexOf(word) != -1){
				
				String substr = str.substring(str.toLowerCase().indexOf(word), str.toLowerCase().indexOf(word)+word.length());
				str = str.replace(substr, "***");
				
			}
		}
		
		return str;
	}
	
	public static List<String> getList(){
		return WordCensorUtility.getBean().getStrList();
	}
	
	public static WordCensorUtility getBean() {
		return (WordCensorUtility)BeanFactoryUtil.getBeanFactory().getBean(WordCensorUtility.beanName);
	}

	@Override
	public void setBeanName(String paramString) {
		WordCensorUtility.beanName = paramString;
	}
	
}
