package org.visionsoft.crm.domain.dao

import org.springframework.stereotype.Component
import org.visionsoft.common.domain.GenericDao
import org.visionsoft.crm.domain.scheme.User

@Component
class UserDao: GenericDao<User>(User::class.java)