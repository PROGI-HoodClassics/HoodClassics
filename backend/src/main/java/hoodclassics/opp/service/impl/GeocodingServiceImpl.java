package hoodclassics.opp.service.impl;
import hoodclassics.opp.service.GeocodingService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
/*
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.databind.JsonNode;
*/
@Service
public class GeocodingServiceImpl implements GeocodingService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GeocodingServiceImpl() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }


    @Override
    public String reverseGeocode(double latitude, double longitude) {
        //Logger logger = LoggerFactory.getLogger(GeocodingServiceImpl.class);

        String url = "https://nominatim.openstreetmap.org/reverse?lat="
                + latitude
                + "&lon="
                + longitude
                + "&format=json&email=your_email@example.com";

        try {
            String jsonResponse = restTemplate.getForObject(url, String.class);
            //logger.debug("Nominatim API Response: {}", jsonResponse);
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            JsonNode addressNode = rootNode.get("address");

            if (addressNode != null) {
                String location = getBestLocation(addressNode);
                String country = getField(addressNode, "country");

                return location + ", " + (country != null ? country : "Unknown Country");
            }
        } catch (Exception e) {
            return "Location not found!";
        }
        return "Location not found!";
    }


    private String getBestLocation(JsonNode addressNode) {
        String[] locationFields = {"town", "city", "city_district", "village"};
        for (String field : locationFields) {
            if (addressNode.has(field) && !addressNode.get(field).asText().isBlank()) {
                return addressNode.get(field).asText();
            }
        }

        return "Unknown City";
    }

    private String getField(JsonNode node, String fieldName) {
        return node.has(fieldName) ? node.get(fieldName).asText() : null;
    }


    @Override
    public String extractLocationFromAddress(String address) {
        if (address != null && !address.isBlank()) {
            String[] parts = address.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    return trimmedPart;
                }
            }
        }
        return "Location not found!";
    }

    @Override
    public String extractCountryFromAddress(String address) {
        if (address != null && !address.isBlank()) {
            String[] parts = address.split(",");
            if (parts.length > 0) {
                String lastPart = parts[parts.length - 1].trim();
                if (!lastPart.isEmpty()) {
                    return lastPart;
                }
            }
        }
        return "Country not found!";
    }
}