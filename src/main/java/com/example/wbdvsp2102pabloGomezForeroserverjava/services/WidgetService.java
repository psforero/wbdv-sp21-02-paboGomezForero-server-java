package com.example.wbdvsp2102pabloGomezForeroserverjava.services;

import com.example.wbdvsp2102pabloGomezForeroserverjava.models.Widget;
import com.example.wbdvsp2102pabloGomezForeroserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;

    public List<Widget> findAllWidgets() {
        return (List<Widget>) repository.findAll();
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);
    }

    public Widget createWidget(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        return repository.save(widget);
    }

    public Integer deleteWidget(Long widgetId) {
        repository.deleteById(widgetId);
        return 1;
    }

    public Integer updateWidget(Long widgetId, Widget widget) {
        Widget originalWidget = repository.findById(widgetId).get();

        if (widget.getType() != null) {
            originalWidget.setType(widget.getType());
        }
        if (widget.getSize() != null) {
            originalWidget.setSize(widget.getSize());
        }
        if (widget.getText() != null) {
            originalWidget.setText(widget.getText());
        }
        if (widget.getWidth() != null) {
            originalWidget.setWidth(widget.getWidth());
        }
        if (widget.getHeight() != null) {
            originalWidget.setHeight(widget.getHeight());
        }
        if (widget.getSrc() != null) {
            originalWidget.setSrc(widget.getSrc());
        }

        repository.save(originalWidget);
        return 1;
    }
}
