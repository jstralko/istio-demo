#!/bin/sh

kubectl port-forward service/istio-ingressgateway 18080:80 -n istio-system
