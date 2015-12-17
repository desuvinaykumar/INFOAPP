package com.info.util;

import javax.servlet.ServletContext;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.web.context.ServletContextAware;

public class BeanFactoryUtil implements BeanFactoryAware,ServletContextAware {

	private static BeanFactory factory = null;
	private static ServletContext servletContext = null;
	
	public  static String majorVersion ="1";
	public  static String minorVersion = "0";
	
	@Override
	public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
		BeanFactoryUtil.factory = beanFactory;
	}

	/**
	 * @return The BeanFactory used to build all bean in the framework
	 */
	public static BeanFactory getBeanFactory() {
		return BeanFactoryUtil.factory;
	}

	@Override
	public void setServletContext(ServletContext context) {
		BeanFactoryUtil.servletContext = context;
	}
	
	public static String getRealPath() {
		return BeanFactoryUtil.servletContext.getRealPath("/");
	}
	
	
	public static ServletContext getServletContext() {
		return BeanFactoryUtil.servletContext;
	}
	
}
