FROM amazonlinux:2023.11.20260406.2

RUN dnf install -y \
         git \
         vi \
         nodejs \
     && rm -rf /var/cache/dnf/* \
     && dnf clean all
