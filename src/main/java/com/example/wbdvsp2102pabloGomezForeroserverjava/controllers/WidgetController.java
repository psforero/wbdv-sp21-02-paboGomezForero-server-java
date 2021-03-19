package com.example.wbdvsp2102pabloGomezForeroserverjava.controllers;

import com.example.wbdvsp2102pabloGomezForeroserverjava.models.Widget;
import com.example.wbdvsp2102pabloGomezForeroserverjava.services.WidgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class WidgetController {
    @Autowired
    WidgetService service;

    @GetMapping("/api/widgets")
    public List<Widget> findAllWidgets() {
        return service.findAllWidgets();
    }

    @GetMapping("/api/topics/{tid}/widgets")
    public List<Widget> findWidgetsForTopic(@PathVariable("tid") String topicId) {
        return service.findWidgetsForTopic(topicId);
    }

    @PostMapping("/api/topics/{tid}/widgets")
    public Widget createWidget(
            @PathVariable("tid") String topicId,
            @RequestBody Widget widget) {
        return service.createWidget(topicId, widget);
    }

    @DeleteMapping("/api/widgets/{wid}")
    public Integer deleteWidget(@PathVariable("wid") Long widgetId) {
        return service.deleteWidget(widgetId);
    }

    @PutMapping("/api/widgets/{wid}")
    public Integer updateWidget(
            @PathVariable("wid") Long widgetId,
            @RequestBody Widget widget) {
        return service.updateWidget(widgetId, widget);
    }
}
