package fr.alexisvachard.authenticationpoc.service.admin;

import fr.alexisvachard.authenticationpoc.exception.AppException;
import fr.alexisvachard.authenticationpoc.persistence.model.User;
import fr.alexisvachard.authenticationpoc.persistence.repository.UserRepository;
import fr.alexisvachard.authenticationpoc.web.dto.response.StatisticsResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class StatisticsService {

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getStatistics() throws AppException {


        List<User> users = userRepository.findAll();

        if(users.isEmpty()) {
            throw new AppException("Unable to retrieve any user...");
        }

        int registeredToday = 0;
        int totalUserUsingTwoFA = 0;
        int totalUser = users.size();

        LocalDate today = LocalDate.now();
        StatisticsResponseDto res = new StatisticsResponseDto();

        for (User u : users){
            //TODO CHECK WHY LOCALDATE ARE RETURNED WITH ONE DAY LESS
            if(u.getAccountCreationDate().isEqual(today.minusDays(1))){
                registeredToday += 1;
            } else if (u.isUsingTwoFA()){
                totalUserUsingTwoFA += 1;
            }
        }

        res.setNewUsersToday(registeredToday);
        res.setTotalNumberOfUsers(totalUser);
        res.setTotalNumberOfUsersUsingTwoFA(totalUserUsingTwoFA);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
