package com.example.wbdvsp2102pabloGomezForeroserverjava.repositories;

import com.example.wbdvsp2102pabloGomezForeroserverjava.models.Widget;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

// responsible for talking to the database
public interface WidgetRepository extends CrudRepository<Widget, Long> {
    @Query(value = "SELECT * FROM wbdv_sp21_schema.widgets WHERE topic_id=:tid", nativeQuery = true)
    List<Widget> findWidgetsForTopic(@Param("tid") String topicId);
}
