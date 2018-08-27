package fr.alexisvachard.authenticationpoc.web.dto.response;

public class StatisticsResponseDto {

    private int newUsersToday;
    private int totalNumberOfUsers;
    private int totalNumberOfUsersUsingTwoFA;

    public StatisticsResponseDto() {
    }

    public StatisticsResponseDto(int newUsersToday, int totalNumberOfUsers, int totalNumberOfUsersUsingTwoFA) {
        this.newUsersToday = newUsersToday;
        this.totalNumberOfUsers = totalNumberOfUsers;
        this.totalNumberOfUsersUsingTwoFA = totalNumberOfUsersUsingTwoFA;
    }

    public int getNewUsersToday() {
        return newUsersToday;
    }

    public void setNewUsersToday(int newUsersToday) {
        this.newUsersToday = newUsersToday;
    }

    public int getTotalNumberOfUsers() {
        return totalNumberOfUsers;
    }

    public void setTotalNumberOfUsers(int totalNumberOfUsers) {
        this.totalNumberOfUsers = totalNumberOfUsers;
    }

    public int getTotalNumberOfUsersUsingTwoFA() {
        return totalNumberOfUsersUsingTwoFA;
    }

    public void setTotalNumberOfUsersUsingTwoFA(int totalNumberOfUsersUsingTwoFA) {
        this.totalNumberOfUsersUsingTwoFA = totalNumberOfUsersUsingTwoFA;
    }
}
