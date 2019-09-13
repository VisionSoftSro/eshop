package org.visionsoft.domain.dao

import org.springframework.stereotype.Component
import org.visionsoft.common.domain.GenericDao
import org.visionsoft.domain.scheme.MyTable
import org.visionsoft.domain.scheme.User

@Component
class UserDao: GenericDao<User>(User::class.java)


@Component
class MyDao: GenericDao<MyTable>(MyTable::class.java)