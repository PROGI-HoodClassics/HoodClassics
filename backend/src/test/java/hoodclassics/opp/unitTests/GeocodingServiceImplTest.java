package hoodclassics.opp.unitTests;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import hoodclassics.opp.service.GeocodingService;
import hoodclassics.opp.service.impl.GeocodingServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class GeocodingServiceImplTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private GeocodingServiceImpl geocodingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testReverseGeocode_Success() throws Exception {
        String mockJsonResponse = "{" +
                "\"address\": {\"city\": \"New York\", \"country\": \"USA\"}" +
                "}";
        JsonNode mockRootNode = Mockito.mock(JsonNode.class);
        JsonNode mockAddressNode = Mockito.mock(JsonNode.class);

        when(restTemplate.getForObject(anyString(), Mockito.eq(String.class))).thenReturn(mockJsonResponse);
        when(objectMapper.readTree(mockJsonResponse)).thenReturn(mockRootNode);
        when(mockRootNode.get("address")).thenReturn(mockAddressNode);
        when(mockAddressNode.has("city")).thenReturn(true);
        when(mockAddressNode.get("city")).thenReturn(mockAddressNode);
        when(mockAddressNode.asText()).thenReturn("New York");
        when(mockAddressNode.has("country")).thenReturn(true);
        when(mockAddressNode.get("country")).thenReturn(mockAddressNode);
        when(mockAddressNode.asText()).thenReturn("USA");

        Optional<String> result = geocodingService.reverseGeocode(40.7128, -74.0060);

        assertTrue(result.isPresent());
        assertEquals("City of New York, United States", result.get());
    }

    @Test
    void testReverseGeocode_Failure() {
        when(restTemplate.getForObject(anyString(), Mockito.eq(String.class))).thenThrow(new RuntimeException("API error"));

        Optional<String> result = geocodingService.reverseGeocode(92, 182);

        assertTrue(result.isEmpty());
    }

    @Test
    void testExtractLocationFromAddress_Success() {
        Optional<String> result = geocodingService.extractLocationFromAddress("New York, USA");

        assertTrue(result.isPresent());
        assertEquals("New York", result.get());
    }

    @Test
    void testExtractLocationFromAddress_Failure() {
        Optional<String> result = geocodingService.extractLocationFromAddress("");

        assertTrue(result.isEmpty());
    }

    @Test
    void testExtractCountryFromAddress_Success() {
        Optional<String> result = geocodingService.extractCountryFromAddress("New York, USA");

        assertTrue(result.isPresent());
        assertEquals("USA", result.get());
    }

    @Test
    void testExtractCountryFromAddress_Failure() {
        Optional<String> result = geocodingService.extractCountryFromAddress("");

        assertTrue(result.isEmpty());
    }
}