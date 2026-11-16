#!/bin/bash
# usage: g.sh idx pattern [ctx-chars]
i=$1; p=$2; c=${3:-160}
LC_ALL=C.UTF-8 tr '\n' ' ' < pages/$i.txt | grep -oiP ".{0,$c}($p).{0,$c}" | head -${4:-6} | sed "s/^/[$i] /"
