package org.visionsoft.cms.mvc.controller.common

import org.mapstruct.factory.Mappers
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.cms.mvc.model.converter.TestConverter
import org.visionsoft.cms.mvc.model.dto.Person
import org.visionsoft.cms.mvc.model.dto.PersonAddress
import org.visionsoft.common.controller.DataControllerSingleType
import org.visionsoft.common.currentUser
import org.visionsoft.common.domain.JpaCriteria
import org.visionsoft.common.transaction.entityManager
import org.visionsoft.crm.domain.dao.UserDao
import org.visionsoft.crm.domain.scheme.User
import java.security.Principal
import java.time.LocalDate
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.Predicate
import javax.persistence.criteria.Root

@RestController
@RequestMapping("test")
class TestController {

    @Autowired
    lateinit var userDao: UserDao

    @GetMapping
    fun get() = "test"

    @GetMapping("getUsers")
    fun getUsers() = userDao.find()

    @GetMapping("getMy")
    fun getMy() = entityManager.createQuery("from MyTable order by note").resultList

    @GetMapping("/user")
    fun user(user: Principal) = currentUser<User>()


    @GetMapping("mapstruct")
    fun get2() {
        val converter = Mappers.getMapper(TestConverter::class.java)
        val person = Person("Samuel", "Jackson", "0123 334466", LocalDate.of(1948, 12, 21), PersonAddress("aaa"))

        val personDto = converter.convertToDto(person)
        println(personDto)

        val personModel = converter.convertToModel(personDto)
        println(personModel)
    }

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
