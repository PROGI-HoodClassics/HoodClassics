package hoodclassics.opp.service.impl;
import hoodclassics.opp.service.GeocodingService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.swing.text.html.Option;
import java.util.Optional;

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
    public Optional<String> reverseGeocode(double latitude, double longitude) {
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
                Optional<String> maybeLocation = getBestLocation(addressNode);
                String location;
                Optional<String> maybeCountry = getField(addressNode, "country");
                String country;
                if (maybeCountry.isEmpty() || maybeLocation.isEmpty()) {
                    return Optional.empty();
                } else {
                    location = maybeLocation.get();
                    country = maybeCountry.get();
                }

                return Optional.of(location + ", " + country);
            }
        } catch (Exception e) {
            return Optional.empty();
        }
        return Optional.empty();
    }


    private Optional<String> getBestLocation(JsonNode addressNode) {
        String[] locationFields = {"town", "city", "city_district", "village"};
        for (String field : locationFields) {
            if (addressNode.has(field) && !addressNode.get(field).asText().isBlank()) {
                return Optional.of(addressNode.get(field).asText());
            }
        }

        return Optional.empty();
    }

    private Optional<String> getField(JsonNode node, String fieldName) {
        return node.has(fieldName) ? Optional.of(node.get(fieldName).asText()) : Optional.empty();
    }


    @Override
    public Optional<String> extractLocationFromAddress(String address) {
        if (address != null && !address.isBlank()) {
            String[] parts = address.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    return Optional.of(trimmedPart);
                }
            }
        }
        return Optional.empty();
    }

    @Override
    public Optional<String> extractCountryFromAddress(String address) {
        if (address != null && !address.isBlank()) {
            String[] parts = address.split(",");
            if (parts.length > 0) {
                String lastPart = parts[parts.length - 1].trim();
                if (!lastPart.isEmpty()) {
                    return Optional.of(lastPart);
                }
            }
        }
        return Optional.empty();
    }
}