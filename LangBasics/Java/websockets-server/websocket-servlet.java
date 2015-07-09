package examples;
 
import org.eclipse.jetty.websocket.servlet.ServletUpgradeRequest;
import org.eclipse.jetty.websocket.servlet.ServletUpgradeResponse;
import org.eclipse.jetty.websocket.servlet.WebSocketCreator;
 
public class MyAdvancedEchoCreator implements WebSocketCreator {
 
    private MyBinaryEchoSocket binaryEcho;
 
    private MyEchoSocket textEcho;
 
    public MyAdvancedEchoCreator() {
        this.binaryEcho = new MyBinaryEchoSocket();
        this.textEcho = new MyEchoSocket();
    }
 
    @Override
    public Object createWebSocket(ServletUpgradeRequest req, ServletUpgradeResponse resp) {
        for (String subprotocol : req.getSubProtocols()) {
            if ("binary".equals(subprotocol)) {
                resp.setAcceptedSubProtocol(subprotocol);
                return binaryEcho;
            }
            if ("text".equals(subprotocol)) {
                resp.setAcceptedSubProtocol(subprotocol);
                return textEcho;
            }
        }
        return null;
    }
}