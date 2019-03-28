Feature: getAllFiles

  As a user
  I want to open github repo
  So I should be able to return all file names as a list


  Scenario Outline: Return all file names from github repository
   Given a git url "<gitUrl>"
    When page was loaded
    Then repository exists
     And repository is not empty

    When repository has files return all file names

    Examples:
      | gitUrl                                 |
      | https://github.com/scabrerao/jenkinz   |
