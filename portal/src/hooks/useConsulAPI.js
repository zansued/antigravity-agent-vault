```js
import { useState, useCallback } from 'react';

export const useConsulAPI = () => {
  const [consulToken] = useState(localStorage.getItem('consul_token') || '');
  const [consulEndpoint] = useState(
    localStorage.getItem('consul_endpoint') || 'http://localhost:8500'
  );

  const fetchServices = useCallback(async () => {
    try {
      const response = await fetch(`${consulEndpoint}/v1/catalog/services`, {
        headers: {
          'X-Consul-Token': consulToken
        }
      });
      const data = await response.json();
      return Object.entries(data).map(([name, tags], index) => ({
        id: `service-${index}`,
        name,
        tags,
        status: ['healthy', 'warning', 'critical'][Math.floor(Math.random() * 3)],
        nodeCount: Math.floor(Math.random() * 5) + 1
      }));
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      return [];
    }
  }, [consulEndpoint, consulToken]);

  const fetchNodes = useCallback(async () => {
    try {
      const response = await fetch(`${consulEndpoint}/v1/catalog/nodes`, {
        headers: {
          'X-Consul-Token': consulToken
        }
      });
      const data = await response.json();
      return data.map((node, index) => ({
        id: `node-${index}`,
        name: node.Node,
        address: node.Address,
        datacenter: node.Datacenter,
        status: Math.random() > 0.2 ? 'alive' : 'failed'
      }));
    } catch (error) {
      console.error('Erro ao buscar nós:', error);
      return [];
    }
  }, [consulEndpoint, consulToken]);

  const fetchKV = useCallback(async (prefix = '') => {
    try {
      const response = await fetch(
        `${consulEndpoint}/v1/kv/${prefix}?recurse=true`,
        {
          headers: {
            'X-Consul-Token': consulToken
          }
        }
      );
      const data = await response.json();
      const kvMap = {};
      data.forEach(item => {
        kvMap[item.Key] = atob(item.Value);
      });
      return kvMap;
    } catch (error) {
      console.error('Erro ao buscar KV store:', error);
      return {};
    }
  }, [consulEndpoint, consulToken]);

  const registerService = useCallback(async (serviceConfig) => {
    try {
      const response = await fetch(
        `${consulEndpoint}/v1/agent/service/register`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Consul-Token': consulToken
          },
          body: JSON.stringify(serviceConfig)
        }
      );
      return response.ok;
    } catch (error) {
      console.error('Erro ao registrar serviço:', error);
      return false;
    }
  }, [consulEndpoint, consulToken]);

  const setKV = useCallback(async (key, value) => {
    try {
      const response = await fetch(`${consulEndpoint}/v1/kv/${key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'text/plain',
          'X-Consul-Token': consulToken
        },
        body: value
      });
      return response.ok;
    } catch (error) {
      console.error('Erro ao definir KV:', error);
      return false;
    }
  }, [consulEndpoint, consulToken]);

  return {
    fetchServices,
    fetchNodes,
    fetchKV,
    registerService,
    setKV,
    consulEndpoint,
    consulToken
  };
};
```