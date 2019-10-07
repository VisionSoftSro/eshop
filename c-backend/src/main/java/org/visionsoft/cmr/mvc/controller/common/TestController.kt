package org.visionsoft.cmr.mvc.controller.common

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.socket.client.WebSocketClient
import org.visionsoft.cmr.mvc.config.WebSocketBean
import org.visionsoft.common.controller.DataControllerSingleType
import org.visionsoft.common.currentUser
import org.visionsoft.common.domain.JpaCriteria
import org.visionsoft.common.transaction.entityManager
import org.visionsoft.crm.domain.dao.MyDao
import org.visionsoft.crm.domain.dao.UserDao
import org.visionsoft.crm.domain.scheme.User
import java.security.Principal
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.Predicate
import javax.persistence.criteria.Root

@RestController
@RequestMapping("test")
class TestController {

    @Autowired
    lateinit var userDao: UserDao

    @Autowired
    lateinit var myDao: MyDao

    @Autowired
    lateinit var websocketClient:WebSocketBean

    @GetMapping
    fun get() = "test"

    @GetMapping("getUsers")
    fun getUsers() = userDao.find()

    @GetMapping("getMy")
    fun getMy() = entityManager.createQuery("from MyTable order by note").resultList

    @GetMapping("/user")
    fun user(user: Principal) = currentUser<User>()

    @GetMapping("/ws-test")
    fun wsTest() = websocketClient.printSession()



}



@RestController
@RequestMapping("users")
class UsersList: DataControllerSingleType<User>() {
    override fun where(criteria: JpaCriteria<User>, criteriaBuilder: CriteriaBuilder, root: Root<User>): Predicate? {
        var list= mutableListOf<Predicate>()
        parameter<String>("login") {
            list.add(criteriaBuilder.and(criteriaBuilder.equal(root.get<String>("login"), it)))
        }

        return criteriaBuilder.and(*list.toTypedArray())
    }
}
