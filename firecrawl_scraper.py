import requests
import json
import sys

def scrape_extensions(api_key, base_url, target_url):
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "url": target_url,
        "formats": ["markdown"]
    }
    
    # Using the correct endpoint structure for Firecrawl v1
    try:
        response = requests.post(f"{base_url}/v1/scrape", headers=headers, json=payload, timeout=60)
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            return None
    except Exception as e:
        print(f"Exception: {str(e)}")
        return None

if __name__ == "__main__":
    api_key = "fc-eb566206cb7921b0645b238753db148b"
    base_url = "https://firecrawl.techstorebrasil.com"
    target_url = "https://geminicli.com/extensions/"
    
    result = scrape_extensions(api_key, base_url, target_url)
    if result:
        # Save results to workspace for easy access
        output_path = "D:\\GEMINI CLI\\antigravity-agent-vault\\extensions_scrape.json"
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        print(f"Scrape successful. Saved to {output_path}")
    else:
        print("Scrape failed.")
        sys.exit(1)
