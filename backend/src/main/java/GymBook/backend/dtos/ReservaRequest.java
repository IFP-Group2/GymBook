package GymBook.backend.dtos;

public class ReservaRequest {
    private Long classId;
    private String userEmail;

    public ReservaRequest() {}

    public ReservaRequest(Long classId, String userEmail) {
        this.classId = classId;
        this.userEmail = userEmail;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
