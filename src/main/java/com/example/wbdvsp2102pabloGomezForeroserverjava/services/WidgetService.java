package com.example.wbdvsp2102pabloGomezForeroserverjava.services;

import com.example.wbdvsp2102pabloGomezForeroserverjava.models.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {
    private List<Widget> widgets = new ArrayList<Widget>();
    {
        Widget w1 = new Widget(123l, "60480131104b9800172010fa", "HEADING", 1, "Welcome to widget list a");
        Widget w2 = new Widget(234l, "60480131104b9800172010fa", "PARAGRAPH", 1, "I am the a1 paragraph");
        Widget w3 = new Widget(345l, "60480131104b9800172010fa", "PARAGRAPH", 1, "And I am the a2 one");
        Widget w4 = new Widget(456l, "60480136104b9800172010fc", "HEADING", 2, "Welcome to widget list b");
        Widget w5 = new Widget(567l, "60480136104b9800172010fc", "PARAGRAPH", 1, "I am paragraph b1");
        Widget w6 = new Widget(678l, "60480136104b9800172010fc", "PARAGRAPH", 1, "And I am paragraph b2");

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

    public Widget createWidgetForTopic(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        widget.setId((new Date()).getTime());
        widgets.add(widget);
        return widget;
    }

    public Integer deleteWidget(Long widgetId) {
        for(int i = 0; i < widgets.size(); i++) {
            if(widgets.get(i).getId().equals(widgetId)) {
                widgets.remove(i);
                return 1;
            }
        }
        return -1;
    }
}
