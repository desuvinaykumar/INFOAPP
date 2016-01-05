package com.info;

public class AppStatus {

	private String errorMsg = "";
	
	private String successMsg = "";
	
	private Object additionalData;

	public Object getAdditionalData() {
		return additionalData;
	}

	public void setAdditionalData(Object additionalData) {
		this.additionalData = additionalData;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
		this.successMsg = "";
	}

	public String getSuccessMsg() {
		return successMsg;
	}

	public void setSuccessMsg(String successMsg) {
		this.successMsg = successMsg;
		this.errorMsg = "";
	}
	
}
