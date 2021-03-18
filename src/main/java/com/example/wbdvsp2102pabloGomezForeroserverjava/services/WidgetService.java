package com.example.wbdvsp2102pabloGomezForeroserverjava.services;

import com.example.wbdvsp2102pabloGomezForeroserverjava.models.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WidgetService {
    private List<Widget> widgets = new ArrayList<Widget>();
    {
        Widget w1 = new Widget(123l, "ABC123", "HEADING", 1, "Welcome to widget list 1 - ABC123");
        Widget w2 = new Widget(234l, "ABC123", "PARAGRAPH", 1, "I am the first paragraph");
        Widget w3 = new Widget(345l, "ABC123", "PARAGRAPH", 1, "And I am the second one");
        Widget w4 = new Widget(456l, "ABC234", "HEADING", 2, "Welcome to widget list 2 - ABC234");
        Widget w5 = new Widget(567l, "ABC234", "PARAGRAPH", 1, "I am paragraph A");
        Widget w6 = new Widget(678l, "ABC234", "PARAGRAPH", 1, "And I am paragraph B");

        widgets.add(w1);
        widgets.add(w2);
        widgets.add(w3);
        widgets.add(w4);
        widgets.add(w5);
        widgets.add(w6);
    }

    public List<Widget> findAllWidgets() {
        return widgets;
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        List<Widget> ws = new ArrayList<Widget>();
        for (Widget widget: widgets) {
            if (widget.getTopicId().equals(topicId)) {
                ws.add(widget);
            }
        }
        return ws;
    }
}
