package org.visionsoft.eshop.forest

import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.http.HttpStatus
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.Predicate
import javax.persistence.criteria.Root
import javax.servlet.http.HttpServletRequest
import javax.validation.constraints.Max
import javax.validation.constraints.Min

@Validated
abstract class ListController<E, W> : AdHocController() {


    abstract val repository: JpaSpecificationExecutor<E>

    open fun testAccess(request: HttpServletRequest) {
        //empty coz not want force implement this method
    }

    open fun where(root: Root<E>, cq: CriteriaQuery<*>, cb: CriteriaBuilder): Predicate? {
        return null
    }

    abstract fun extract(list: List<E>): List<W>

    @GetMapping
    fun list(@Min(0) @RequestParam("page") page: Int,
                           @Min(1) @Max(100) @RequestParam("pageSize") size: Int,
                           ordering: OrderingWrapper,
                           request: HttpServletRequest): ScrollableList<W> {
        testAccess(request)
        val resultPage = repository.findAll(::where, PageRequest.of(page-1, size, ordering.sort()))
        if (page > resultPage.totalPages) {
            throw HttpStatus.BAD_REQUEST.exception("this expression page > totalPages must by false")
        }
        return ScrollableList(
                list = extract(resultPage.content),
                page = page,
                objectsPerPage = size,
                total = resultPage.totalElements
        )
    }
}

class OrderingWrapper {
    var order: List<OrderClause> = mutableListOf()
}
class OrderClause {
    lateinit var name: String
    lateinit var dir: String
}

fun OrderingWrapper.sort():Sort {
    if(order.isEmpty()) {
        return Sort.by(Sort.Order.asc("id"))
    }
    return  Sort.by(order.map { Sort.Order(Sort.Direction.fromString(it.dir), it.name) })
}