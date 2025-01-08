package hoodclassics.opp.service.impl;
import hoodclassics.opp.service.GeocodingService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GeocodingServiceImpl implements GeocodingService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GeocodingServiceImpl(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    // iz koordinata dobiješ adresu lokacije
    public String reverseGeocode(double latitude, double longitude) {
        String url = "https://nominatim.openstreetmap.org/reverse?lat="
                + latitude
                + "&lon="
                + longitude
                + "&format=json&email=your_email@example.com";

        String jsonResponse = restTemplate.getForObject(url, String.class);
        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            JsonNode addressNode = rootNode.get("address");

            if (addressNode != null) {
                String city = addressNode.get("city") != null ? addressNode.get("city").asText() : "Unknown City";
                String country = addressNode.get("country") != null ? addressNode.get("country").asText() : "Unknown Country";
                return city + ", " + country;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "Location not found!";
    }

    // iz adrese dobiješ koordinate
    public String forwardGeocode(String address) {
        String url = UriComponentsBuilder.fromHttpUrl("https://nominatim.openstreetmap.org/search")
                .queryParam("q", address)
                .queryParam("format", "json")
                .queryParam("email", "your_email@example.com")
                .build().toUriString();

        String jsonResponse = restTemplate.getForObject(url, String.class);

        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            if (rootNode.isArray() && rootNode.size() > 0) {
                JsonNode firstResult = rootNode.get(0);
                double lat = firstResult.get("lat").asDouble();
                double lon = firstResult.get("lon").asDouble();
                return "Latitude: " + lat + ", Longitude: " + lon;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "Address not found!";
    }
}