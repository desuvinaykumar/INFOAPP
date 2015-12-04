# INFOAPP
While using the project create a JNDI resource in application server with name "jdbc/MySQLDS".

if the JNDI is not working, do the following changes in mvc-dispatcher-servlet.xml file. 
  * comment the JNDI lookup tag.
  * enable the property configurer and datasource tags on the top.
  * update the jdbclocal.properties file in WEB-INF folder with your database properties.

# Note:
  * Please use only mysql database for now
  * The Jar file are added with extension “jar-“, please change the extension to “jar” while using.
