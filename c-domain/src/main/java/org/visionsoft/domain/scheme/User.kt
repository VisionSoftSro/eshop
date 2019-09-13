package org.visionsoft.domain.scheme

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.core.GrantedAuthority
import org.visionsoft.common.IUser
import javax.persistence.*

@Entity
@Table(name="a_user")
class User : IUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = RoleCode::class)
    @JoinTable(name="roles", joinColumns = [JoinColumn(name="a_user")])
    @Column(name="role")
    var roles: MutableList<RoleCode> = mutableListOf()

    var email:String? = null


    //IUser overrides

    override val authorities: List<GrantedAuthority>
    @JsonIgnore get() = roles.map { GrantedAuthority { it.name  } }
    override val name: String @JsonIgnore get() = email!!
    override var enabled:Boolean = false


}

enum class RoleCode {
    ROLE_ADMIN, ROLE_USER
}