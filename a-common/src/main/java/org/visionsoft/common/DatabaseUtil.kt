package org.visionsoft.common

import org.springframework.dao.EmptyResultDataAccessException
import org.visionsoft.common.transaction.entityManager
import javax.persistence.*


val <X> TypedQuery<X>.singleResultOrNull
    get() = try {
        this.singleResult
    } catch (e: EmptyResultDataAccessException) {
        null
    } catch (e: NoResultException) {
        null
    }

//fun CriteriaBuilder.lowerLike(left: Path<String>, right:String) = CriteriaHelper.likeLowerUnaccent(this, left, right)
//
//@MappedSuperclass
//@EntityListeners(ModificationInfoListener::class)
//abstract class ModificationInfo {
//    @JsonSerialize(using = DateSerializer::class)
//    var createdOn: Date? = null
//    @JsonSerialize(using = DateSerializer::class)
//    var modifiedOn: Date? = null
//
//    @JsonIgnore
//    @ManyToOne
//    var createdBy: UserAccount? = null
//
//    @JsonIgnore
//    @ManyToOne
//    var modifiedBy: UserAccount? = null
//
//}
//class ModificationInfoListener {
//    @PrePersist
//    fun modifyWhenCreating(info: ModificationInfo) {
//        info.createdOn = Date()
//        info.modifiedOn = Date()
//        info.createdBy = transaction(propagation = Propagation.REQUIRES_NEW) { currentUser }
//        info.modifiedBy = info.createdBy
//    }
//
//    @PreUpdate
//    fun modifyWhenUpdating(info: ModificationInfo) {
//        info.modifiedOn = Date()
//        info.modifiedBy =  transaction(propagation = Propagation.REQUIRES_NEW)  { currentUser }
//    }
//}
//
//fun Predicate.add(list:MutableList<Predicate>) {
//    list.add(this)
//}
//
//fun getOrder(orderType: OrderType, id:Long): Order = when(orderType) {
//    OrderType.Construction -> constructionOrderDAO[id]
//    OrderType.Deconstruction -> deconstructionOrderDAO[id]
//    OrderType.Service -> serviceOrderDAO[id]
//}


inline fun <T> T.applyAndPersist(em:EntityManager = entityManager, block: T.() -> Unit) = this.apply {
    block()
    persist(em)
}

fun <T> T.persist(em:EntityManager) = this.apply {
    em.persist(this)
}
